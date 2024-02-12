package org.database.backend.services.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.database.backend.models.Naracka;
import org.database.backend.models.enums.OrderStatus;
import org.database.backend.repositories.NarackaRepository;
import org.springframework.beans.factory.annotation.Value;
import org.database.backend.models.Naplata;
import org.database.backend.models.Potrosuvac;
import org.database.backend.models.dto.NaplataDto;
import org.database.backend.models.enums.PaymentType;
import org.database.backend.repositories.NaplataRepository;
import org.database.backend.repositories.PotrosuvacRepository;
import org.database.backend.services.NaplataService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NaplataServiceImpl implements NaplataService {
    private final NaplataRepository naplataRepository;
    private final PotrosuvacRepository potrosuvacRepository;

    private final NarackaRepository narackaRepository;

    @Value("${stripe.keys.secret}")
    private String API_SECRET_KEY;

    public NaplataServiceImpl(NaplataRepository naplataRepository, PotrosuvacRepository potrosuvacRepository, NarackaRepository narackaRepository) {
        this.naplataRepository = naplataRepository;
        this.potrosuvacRepository = potrosuvacRepository;
        this.narackaRepository = narackaRepository;
    }

    @Override
    public List<Naplata> findAllNaplati() {
        return naplataRepository.findAll();
    }

    @Override
    public List<Naplata> findAllNaplatiByCustomerId(Integer id) {
        return naplataRepository.findAllByPotrosuvacId(id);
    }

    @Override
    public Naplata findNaplataById(Integer id) throws Exception {
        return naplataRepository.findById(id).orElseThrow(() -> new Exception("Payment not found"));
    }

    @Transactional
    @Override
    public Integer saveNaplata(NaplataDto naplata) throws Exception {
        Naplata newNaplata = new Naplata();

        Potrosuvac potrosuvac = potrosuvacRepository.findById(naplata.getPotrosuvacId())
                .orElseThrow(() -> new Exception("User not found"));

        Naracka naracka = narackaRepository.findById(naplata.getNarackaId())
                .orElseThrow(() -> new Exception("Order not found"));

        newNaplata.setPotrosuvac(potrosuvac);
        newNaplata.setNaracka(naracka);

        newNaplata.setIznos(naplata.getTotalPrice());
        PaymentType paymentType = PaymentType.valueOf(naplata.getPaymentType());
        newNaplata.setNacinNaPlakjane(paymentType);

        if (paymentType != PaymentType.Cash) {
            createStripeCharge(naplata);
        }

        naplataRepository.save(newNaplata);

        naracka.setStatus(OrderStatus.PendingAdminApproval);
        narackaRepository.save(naracka);

        return newNaplata.getId();
    }

    @Override
    public void editNaplata(Integer id, NaplataDto naplata) throws Exception {
        Naplata updateNaplata = findNaplataById(id);

        updateNaplata.setIznos(naplata.getTotalPrice());
        updateNaplata.setNacinNaPlakjane(PaymentType.valueOf(naplata.getPaymentType()));

        naplataRepository.save(updateNaplata);
    }

    @Override
    public void deleteNaplata(Integer id) {
        naplataRepository.deleteById(id);
    }

    private void createStripeCharge(NaplataDto naplataDto) throws StripeException {
        try {
            Stripe.apiKey = API_SECRET_KEY;
            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", naplataDto.getTotalPrice() * 100);
            chargeParams.put("currency", "MKD");
            chargeParams.put("description", "Charge for order" + naplataDto.getNarackaId());
            chargeParams.put("source", naplataDto.getToken());

            Charge.create(chargeParams);
        } catch (Exception ex) {
            throw ex;
        }
    }
}

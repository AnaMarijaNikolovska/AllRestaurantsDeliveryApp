package org.database.backend.configurations;
import org.database.backend.services.KorisnikService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final UsernamePasswordAuthProvider authProvider;
    private final KorisnikService korisnikService;

    private final RestAuthEntryPoint restAuthEntryPoint;

    @Bean
    public AuthTokenFilter authenticationTokenFilter() {
        return new AuthTokenFilter(korisnikService);
    }

    public SecurityConfiguration(UsernamePasswordAuthProvider authProvider, KorisnikService korisnikService, RestAuthEntryPoint restAuthEntryPoint) {
        this.authProvider = authProvider;
        this.korisnikService = korisnikService;
        this.restAuthEntryPoint = restAuthEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .csrfTokenRepository(csrfTokenRepository())
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/assets/**", "/register", "/login").permitAll()
                        .requestMatchers("/api/public/**").permitAll() // Allow access to public APIs
                        .requestMatchers(HttpMethod.GET, "/api/**").authenticated() // Require authentication for GET requests to other APIs
                        .requestMatchers("/api/**").hasRole("ROLE_ADMIN") // Require admin role for other APIs
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(restAuthEntryPoint)
                )
                .formLogin(formLogin -> formLogin
                        .loginProcessingUrl("/login")
                )
                .addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() {
        return authProvider::authenticate;
    }

    @Bean
    public CsrfTokenRepository csrfTokenRepository() {
        return CookieCsrfTokenRepository.withHttpOnlyFalse();
    }
}
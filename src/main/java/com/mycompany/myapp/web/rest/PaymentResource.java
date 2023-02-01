package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.service.custom.PaymentService;
import com.mycompany.myapp.service.dto.CartDTO;
import com.mycompany.myapp.service.dto.ItemDTO;
import com.mycompany.myapp.service.dto.OrderDTO;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PaymentResource {

    private final Logger log = LoggerFactory.getLogger(PaymentResource.class);
    private final PaymentService paymentService;

    public PaymentResource(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/payment")
    @PreAuthorize("!hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<OrderDTO> payCart(@RequestAttribute String login, @RequestBody CartDTO cart) {
        log.debug("REST request to pay cart");
        return ResponseEntity.ok(paymentService.payCart(login, cart));
    }
}

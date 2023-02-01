package com.mycompany.myapp.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ItemDTO {

    private Long id;
    private int quantity;

    public Long getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }
}

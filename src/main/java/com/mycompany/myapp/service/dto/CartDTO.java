package com.mycompany.myapp.service.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CartDTO {

    private List<ItemDTO> items;
    private String deliveryAddress;
    private String note;

    public List<ItemDTO> getItems() {
        return this.items;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public String getNote() {
        return note;
    }
}

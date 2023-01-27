package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.enumeration.OrderDetailStatus;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.OrderDetails} entity.
 */
public class OrderDetailsDTO implements Serializable {

    private Long id;

    private Integer quantity;

    private Double price;

    private OrderDetailStatus status;

    private ProductDTO product;

    private OrderDTO order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public OrderDetailStatus getStatus() {
        return status;
    }

    public void setStatus(OrderDetailStatus status) {
        this.status = status;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDetailsDTO)) {
            return false;
        }

        OrderDetailsDTO orderDetailsDTO = (OrderDetailsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderDetailsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderDetailsDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            ", status='" + getStatus() + "'" +
            ", product=" + getProduct() +
            ", order=" + getOrder() +
            "}";
    }
}

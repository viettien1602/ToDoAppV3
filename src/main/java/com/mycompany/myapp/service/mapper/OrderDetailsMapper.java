package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.OrderDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderDetails} and its DTO {@link OrderDetailsDTO}.
 */
@Mapper(componentModel = "spring", uses = { ProductMapper.class, OrderMapper.class })
public interface OrderDetailsMapper extends EntityMapper<OrderDetailsDTO, OrderDetails> {
    @Mapping(target = "product", source = "product", qualifiedByName = "id")
    @Mapping(target = "order", source = "order", qualifiedByName = "id")
    OrderDetailsDTO toDto(OrderDetails s);
}

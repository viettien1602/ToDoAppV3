package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.OrderDetails;
import com.mycompany.myapp.repository.OrderDetailsRepository;
import com.mycompany.myapp.service.OrderDetailsService;
import com.mycompany.myapp.service.dto.OrderDetailsDTO;
import com.mycompany.myapp.service.mapper.OrderDetailsMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OrderDetails}.
 */
@Service
@Transactional
public class OrderDetailsServiceImpl implements OrderDetailsService {

    private final Logger log = LoggerFactory.getLogger(OrderDetailsServiceImpl.class);

    private final OrderDetailsRepository orderDetailsRepository;

    private final OrderDetailsMapper orderDetailsMapper;

    public OrderDetailsServiceImpl(OrderDetailsRepository orderDetailsRepository, OrderDetailsMapper orderDetailsMapper) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderDetailsMapper = orderDetailsMapper;
    }

    @Override
    public OrderDetailsDTO save(OrderDetailsDTO orderDetailsDTO) {
        log.debug("Request to save OrderDetails : {}", orderDetailsDTO);
        OrderDetails orderDetails = orderDetailsMapper.toEntity(orderDetailsDTO);
        orderDetails = orderDetailsRepository.save(orderDetails);
        return orderDetailsMapper.toDto(orderDetails);
    }

    @Override
    public Optional<OrderDetailsDTO> partialUpdate(OrderDetailsDTO orderDetailsDTO) {
        log.debug("Request to partially update OrderDetails : {}", orderDetailsDTO);

        return orderDetailsRepository
            .findById(orderDetailsDTO.getId())
            .map(
                existingOrderDetails -> {
                    orderDetailsMapper.partialUpdate(existingOrderDetails, orderDetailsDTO);

                    return existingOrderDetails;
                }
            )
            .map(orderDetailsRepository::save)
            .map(orderDetailsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderDetailsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrderDetails");
        return orderDetailsRepository.findAll(pageable).map(orderDetailsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrderDetailsDTO> findOne(Long id) {
        log.debug("Request to get OrderDetails : {}", id);
        return orderDetailsRepository.findById(id).map(orderDetailsMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderDetails : {}", id);
        orderDetailsRepository.deleteById(id);
    }
}

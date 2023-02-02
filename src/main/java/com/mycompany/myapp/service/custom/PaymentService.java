package com.mycompany.myapp.service.custom;

import com.mycompany.myapp.domain.Order;
import com.mycompany.myapp.domain.OrderDetails;
import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.enumeration.OrderDetailStatus;
import com.mycompany.myapp.repository.OrderDetailsRepository;
import com.mycompany.myapp.repository.OrderRepository;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.dto.CartDTO;
import com.mycompany.myapp.service.dto.ItemDTO;
import com.mycompany.myapp.service.dto.OrderDTO;
import com.mycompany.myapp.service.mapper.OrderMapper;
import java.time.Instant;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    public OrderRepository orderRepository;

    @Autowired
    public OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrderMapper orderMapper;

    @Transactional
    public OrderDTO payCart(String login, CartDTO cart) {
        User user = userRepository.findOneByLogin(login).get();
        Double totalPrice = 0.0;
        for (ItemDTO item : cart.getItems()) {
            Optional<Product> isExistProduct = productRepository.findById(item.getId());
            if (isExistProduct.isEmpty()) {
                throw new IllegalStateException("Product not found.");
            }
            Product product = isExistProduct.get();
            if (product.getQuantity() < item.getQuantity()) {
                throw new IllegalStateException("Not enough product \"" + product.getProductName() + "\" quantity.");
            }
            totalPrice += (Double) (item.getQuantity() * product.getPrice());
        }

        //if everything's quantity is okay
        Order order = new Order();
        order.setDateTime(Instant.now());
        order.setTotalPrice(totalPrice);
        order.deliveryAddress(cart.getDeliveryAddress());
        order.setNote(cart.getNote());
        order.setStatus(true);
        order.setUser(user);
        order = orderRepository.save(order);

        for (ItemDTO item : cart.getItems()) {
            Product product = productRepository.findById(item.getId()).get();
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setQuantity(item.getQuantity());
            orderDetails.setPrice(product.getPrice());
            orderDetails.setStatus(OrderDetailStatus.DONE);
            orderDetails.setProduct(product);
            orderDetails.setOrder(order);
            orderDetailsRepository.save(orderDetails);
            product.setQuantity(product.getQuantity() - item.getQuantity());
        }
        return orderMapper.toDto(order);
    }
}

package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Order;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select jhiOrder from Order jhiOrder where jhiOrder.user.login = ?#{principal.username}")
    List<Order> findByUserIsCurrentUser();

    @Query(value = "select sum(o.total_price) from jhi_order o where date(o.date_time) = date(?1)", nativeQuery = true)
    Double findByDate(Instant date);
}

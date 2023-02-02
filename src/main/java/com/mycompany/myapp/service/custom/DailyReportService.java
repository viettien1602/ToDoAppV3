package com.mycompany.myapp.service.custom;

import com.mycompany.myapp.domain.Report;
import com.mycompany.myapp.repository.OrderRepository;
import com.mycompany.myapp.repository.ReportRepository;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DailyReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ReportRepository reportRepository;

    public void reportTotalTurnoverPerDay() {
        Instant todayInstant = Instant.now();
        Double totalTurnover = orderRepository.findByDate(todayInstant);
        Report report = new Report();
        report.setReportTime(todayInstant);
        report.setTotalTurnover(totalTurnover);
        report.setStatus(true);
        reportRepository.save(report);
    }
}

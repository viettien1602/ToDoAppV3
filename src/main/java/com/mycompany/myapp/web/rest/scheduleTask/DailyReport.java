package com.mycompany.myapp.web.rest.scheduleTask;

import com.mycompany.myapp.service.custom.DailyReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DailyReport {

    private final Logger log = LoggerFactory.getLogger(DailyReport.class);

    @Autowired
    private DailyReportService dailyReportService;

    //Auto execute at 23:59:00pm every day
    //For testing, use this cron expression: 15 * * * * ? (at second :15 of every minute)
    @Scheduled(cron = "0 59 23 * * ?")
    public void reportTotalTurnoverPerDay() {
        log.info("Daily report for total turnover");
        dailyReportService.reportTotalTurnoverPerDay();
    }
}

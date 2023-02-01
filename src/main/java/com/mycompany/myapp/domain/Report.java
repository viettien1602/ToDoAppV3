package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A Report.
 */
@Entity
@Table(name = "report")
public class Report implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "report_time")
    private Instant reportTime;

    @Column(name = "total_turnover")
    private Double totalTurnover;

    @Column(name = "status")
    private Boolean status;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Report id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getReportTime() {
        return this.reportTime;
    }

    public Report reportTime(Instant reportTime) {
        this.reportTime = reportTime;
        return this;
    }

    public void setReportTime(Instant reportTime) {
        this.reportTime = reportTime;
    }

    public Double getTotalTurnover() {
        return this.totalTurnover;
    }

    public Report totalTurnover(Double totalTurnover) {
        this.totalTurnover = totalTurnover;
        return this;
    }

    public void setTotalTurnover(Double totalTurnover) {
        this.totalTurnover = totalTurnover;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Report status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Report)) {
            return false;
        }
        return id != null && id.equals(((Report) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Report{" +
            "id=" + getId() +
            ", reportTime='" + getReportTime() + "'" +
            ", totalTurnover=" + getTotalTurnover() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}

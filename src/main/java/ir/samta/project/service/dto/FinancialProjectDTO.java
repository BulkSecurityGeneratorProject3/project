package ir.samta.project.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;
import ir.samta.project.domain.enumeration.FinancialProjectType;

/**
 * A DTO for the FinancialProject entity.
 */
public class FinancialProjectDTO implements Serializable {

    private Long id;

    private String title;

    private String code;

    private String name;

    private String sellContractNo;

    private Long amount;

    private ZonedDateTime registerDate;

    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    private String description;

    private FinancialProjectType financialProjectType;


    private Long projectId;

    private String projectTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSellContractNo() {
        return sellContractNo;
    }

    public void setSellContractNo(String sellContractNo) {
        this.sellContractNo = sellContractNo;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FinancialProjectType getFinancialProjectType() {
        return financialProjectType;
    }

    public void setFinancialProjectType(FinancialProjectType financialProjectType) {
        this.financialProjectType = financialProjectType;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FinancialProjectDTO financialProjectDTO = (FinancialProjectDTO) o;
        if (financialProjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), financialProjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FinancialProjectDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", sellContractNo='" + getSellContractNo() + "'" +
            ", amount=" + getAmount() +
            ", registerDate='" + getRegisterDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", financialProjectType='" + getFinancialProjectType() + "'" +
            ", project=" + getProjectId() +
            ", project='" + getProjectTitle() + "'" +
            "}";
    }
}
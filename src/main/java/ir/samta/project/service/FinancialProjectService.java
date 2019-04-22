package ir.samta.project.service;

import ir.samta.project.domain.FinancialProject;
import ir.samta.project.domain.enumeration.FinancialProjectType;
import ir.samta.project.repository.FinancialProjectRepository;
import ir.samta.project.repository.search.FinancialProjectSearchRepository;
import ir.samta.project.service.dto.FinancialProjectDTO;
import ir.samta.project.service.dto.FinancialProjectMainDTO;
import ir.samta.project.service.dto.FinancialProjectTypeExistDTO;
import ir.samta.project.service.mapper.FinancialProjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing FinancialProject.
 */
@Service
@Transactional
public class FinancialProjectService {

    private final Logger log = LoggerFactory.getLogger(FinancialProjectService.class);

    private final FinancialProjectRepository financialProjectRepository;

    private final FinancialProjectMapper financialProjectMapper;

    private final FinancialProjectSearchRepository financialProjectSearchRepository;

    public FinancialProjectService(FinancialProjectRepository financialProjectRepository, FinancialProjectMapper financialProjectMapper, FinancialProjectSearchRepository financialProjectSearchRepository) {
        this.financialProjectRepository = financialProjectRepository;
        this.financialProjectMapper = financialProjectMapper;
        this.financialProjectSearchRepository = financialProjectSearchRepository;
    }

    /**
     * Save a financialProject.
     *
     * @param financialProjectDTO the entity to save
     * @return the persisted entity
     */
    public FinancialProjectDTO save(FinancialProjectDTO financialProjectDTO) {
        log.debug("Request to save FinancialProject : {}", financialProjectDTO);
        FinancialProject financialProject = financialProjectMapper.toEntity(financialProjectDTO);
        financialProject = financialProjectRepository.save(financialProject);
        FinancialProjectDTO result = financialProjectMapper.toDto(financialProject);
        financialProjectSearchRepository.save(financialProject);
        return result;
    }

    /**
     * Get all the financialProjects.
     *
     * @param projectId
     * @param type
     * @param pageable  the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FinancialProjectDTO> findAll(Long projectId, FinancialProjectType type, Pageable pageable) {
        log.debug("Request to get all FinancialProjects");
        return financialProjectRepository.findAllByProject_IdAndFinancialProjectType(projectId, type, pageable)
            .map(financialProjectMapper::toDto);
    }


    /**
     * Get one financialProject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FinancialProjectDTO> findOne(Long id) {
        log.debug("Request to get FinancialProject : {}", id);
        return financialProjectRepository.findById(id)
            .map(financialProjectMapper::toDto);
    }

    /**
     * Delete the financialProject by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FinancialProject : {}", id);
        financialProjectRepository.deleteById(id);
        financialProjectSearchRepository.deleteById(id);
    }

    /**
     * Search for the financialProject corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FinancialProjectDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of FinancialProjects for query {}", query);
        return financialProjectSearchRepository.search(queryStringQuery(query), pageable)
            .map(financialProjectMapper::toDto);
    }

    public FinancialProjectDTO findByProjectAndType(Long projectId, FinancialProjectType type) {
        return financialProjectMapper.toDto(financialProjectRepository.findFirstByProject_IdAndFinancialProjectType(projectId, type));
    }

    public Long getSumOfCostForProject(Long projectId) {
        List<FinancialProjectType> type = new ArrayList<>();
        type.add(FinancialProjectType.SEND_TO_PROJECT_HAVE_CODE);
        return financialProjectRepository.getSumOfCostForProject(projectId, type);
    }

    public FinancialProjectTypeExistDTO getStyle(Long projectId) {
        FinancialProjectTypeExistDTO result = new FinancialProjectTypeExistDTO();
        result.setExistSurplusCost(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SURPLUS_COST));
        result.setExistSendToProjectHaveCode(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SEND_TO_PROJECT_HAVE_CODE));
        result.setExistReceivedTotalForProject(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.RECEIVED_TOTAL_FOR_PROJECT));
        result.setExistReceivedFromOrganization(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.RECEIVED_FROM_ORGANIZATION));
        result.setExistReceivedFromInstitution(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.RECEIVED_FROM_INSTITUTION));
        result.setExistInClearing(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.IN_CLEARING));
        result.setExistFinalClearing(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.FINAL_CLEARING));
        result.setExistDebitToInstitution(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.DEBIT_TO_INSTITUTION));
        result.setExistCreditRemain(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.CREDIT_REMAIN));
        result.setExistCreditEstimates(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.CREDIT_ESTIMATES));
        result.setExistBeforeClearing(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.BEFORE_CLEARING));
        result.setExistAmountConfirmed(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.AMOUNT_CONFIRMED));
        result.setExistSellContractAmount(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SELL_CONTRACT_AMOUNT));
        result.setExistCreditApply(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.CREDIT_APPLY));
        result.setExistSendToProjectNotHaveCode(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SEND_TO_PROJECT_NOT_HAVE_CODE));

        return result;
    }

    public FinancialProjectMainDTO getMainFinancialProject(Long projectId) {
        FinancialProjectMainDTO result = new FinancialProjectMainDTO();
        result.setAmountConfirmed(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.AMOUNT_CONFIRMED));
        result.setSendToProjectNotHaveCode(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SEND_TO_PROJECT_NOT_HAVE_CODE));
        result.setSendToProjectHaveCode(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SEND_TO_PROJECT_HAVE_CODE));
        result.setSellContractAmount(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SELL_CONTRACT_AMOUNT));
        result.setReceivedFromOrganization(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.RECEIVED_FROM_ORGANIZATION));
        result.setReceivedFromInstitution(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.RECEIVED_FROM_INSTITUTION));
        result.setCreditEstimatesAmount(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.CREDIT_ESTIMATES));
        result.setCreditApply(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.CREDIT_APPLY));
        return result;
    }
}

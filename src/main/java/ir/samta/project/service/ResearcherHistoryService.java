package ir.samta.project.service;

import ir.samta.project.domain.ResearcherHistory;
import ir.samta.project.repository.ResearcherHistoryRepository;
import ir.samta.project.repository.search.ResearcherHistorySearchRepository;
import ir.samta.project.service.dto.ResearcherHistoryDTO;
import ir.samta.project.service.mapper.ResearcherHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ResearcherHistory.
 */
@Service
@Transactional
public class ResearcherHistoryService {

    private final Logger log = LoggerFactory.getLogger(ResearcherHistoryService.class);

    private final ResearcherHistoryRepository researcherHistoryRepository;

    private final ResearcherHistoryMapper researcherHistoryMapper;

    private final ResearcherHistorySearchRepository researcherHistorySearchRepository;

    public ResearcherHistoryService(ResearcherHistoryRepository researcherHistoryRepository, ResearcherHistoryMapper researcherHistoryMapper, ResearcherHistorySearchRepository researcherHistorySearchRepository) {
        this.researcherHistoryRepository = researcherHistoryRepository;
        this.researcherHistoryMapper = researcherHistoryMapper;
        this.researcherHistorySearchRepository = researcherHistorySearchRepository;
    }

    /**
     * Save a researcherHistory.
     *
     * @param researcherHistoryDTO the entity to save
     * @return the persisted entity
     */
    public ResearcherHistoryDTO save(ResearcherHistoryDTO researcherHistoryDTO) {
        log.debug("Request to save ResearcherHistory : {}", researcherHistoryDTO);
        ResearcherHistory researcherHistory = researcherHistoryMapper.toEntity(researcherHistoryDTO);
        researcherHistory = researcherHistoryRepository.save(researcherHistory);
        ResearcherHistoryDTO result = researcherHistoryMapper.toDto(researcherHistory);
        researcherHistorySearchRepository.save(researcherHistory);
        return result;
    }

    /**
     * Get all the researcherHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ResearcherHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ResearcherHistories");
        return researcherHistoryRepository.findAll(pageable)
            .map(researcherHistoryMapper::toDto);
    }


    /**
     * Get one researcherHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ResearcherHistoryDTO> findOne(Long id) {
        log.debug("Request to get ResearcherHistory : {}", id);
        return researcherHistoryRepository.findById(id)
            .map(researcherHistoryMapper::toDto);
    }

    /**
     * Delete the researcherHistory by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ResearcherHistory : {}", id);
        researcherHistoryRepository.deleteById(id);
        researcherHistorySearchRepository.deleteById(id);
    }

    /**
     * Search for the researcherHistory corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ResearcherHistoryDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ResearcherHistories for query {}", query);
        return researcherHistorySearchRepository.search(queryStringQuery(query), pageable)
            .map(researcherHistoryMapper::toDto);
    }
}

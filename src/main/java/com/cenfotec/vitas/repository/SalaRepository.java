package com.cenfotec.vitas.repository;

import com.cenfotec.vitas.domain.Sala;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Sala entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {}

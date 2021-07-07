package com.cenfotec.vitas.repository;

import com.cenfotec.vitas.domain.Internamiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Internamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InternamientoRepository extends JpaRepository<Internamiento, Long> {}

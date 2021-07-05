package com.cenfotec.vitas.repository;

import com.cenfotec.vitas.domain.VisitasPaciente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the VisitasPaciente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitasPacienteRepository extends JpaRepository<VisitasPaciente, Long> {}

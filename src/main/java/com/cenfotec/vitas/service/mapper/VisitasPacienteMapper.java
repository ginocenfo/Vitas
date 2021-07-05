package com.cenfotec.vitas.service.mapper;

import com.cenfotec.vitas.domain.*;
import com.cenfotec.vitas.service.dto.VisitasPacienteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link VisitasPaciente} and its DTO {@link VisitasPacienteDTO}.
 */
@Mapper(componentModel = "spring", uses = { UsuarioMapper.class, SalaMapper.class })
public interface VisitasPacienteMapper extends EntityMapper<VisitasPacienteDTO, VisitasPaciente> {
    @Mapping(target = "paciente", source = "paciente", qualifiedByName = "id")
    @Mapping(target = "visitante", source = "visitante", qualifiedByName = "id")
    @Mapping(target = "sala", source = "sala", qualifiedByName = "id")
    VisitasPacienteDTO toDto(VisitasPaciente s);
}

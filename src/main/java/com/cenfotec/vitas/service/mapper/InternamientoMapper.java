package com.cenfotec.vitas.service.mapper;

import com.cenfotec.vitas.domain.*;
import com.cenfotec.vitas.service.dto.InternamientoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Internamiento} and its DTO {@link InternamientoDTO}.
 */
@Mapper(componentModel = "spring", uses = { UsuarioMapper.class, SalaMapper.class })
public interface InternamientoMapper extends EntityMapper<InternamientoDTO, Internamiento> {
    @Mapping(target = "paciente", source = "paciente", qualifiedByName = "id")
    @Mapping(target = "sala", source = "sala", qualifiedByName = "id")
    InternamientoDTO toDto(Internamiento s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InternamientoDTO toDtoId(Internamiento internamiento);
}

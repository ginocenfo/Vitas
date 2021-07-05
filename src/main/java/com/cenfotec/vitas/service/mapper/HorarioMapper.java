package com.cenfotec.vitas.service.mapper;

import com.cenfotec.vitas.domain.*;
import com.cenfotec.vitas.service.dto.HorarioDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Horario} and its DTO {@link HorarioDTO}.
 */
@Mapper(componentModel = "spring", uses = { SalaMapper.class })
public interface HorarioMapper extends EntityMapper<HorarioDTO, Horario> {
    @Mapping(target = "horario", source = "horario", qualifiedByName = "id")
    HorarioDTO toDto(Horario s);
}

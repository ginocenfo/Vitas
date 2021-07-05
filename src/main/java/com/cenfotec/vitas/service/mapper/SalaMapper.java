package com.cenfotec.vitas.service.mapper;

import com.cenfotec.vitas.domain.*;
import com.cenfotec.vitas.service.dto.SalaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Sala} and its DTO {@link SalaDTO}.
 */
@Mapper(componentModel = "spring", uses = { HospitalMapper.class })
public interface SalaMapper extends EntityMapper<SalaDTO, Sala> {
    @Mapping(target = "hospital", source = "hospital", qualifiedByName = "id")
    SalaDTO toDto(Sala s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SalaDTO toDtoId(Sala sala);
}

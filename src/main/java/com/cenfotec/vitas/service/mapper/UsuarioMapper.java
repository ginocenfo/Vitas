package com.cenfotec.vitas.service.mapper;

import com.cenfotec.vitas.domain.*;
import com.cenfotec.vitas.service.dto.UsuarioDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Usuario} and its DTO {@link UsuarioDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {
    @Mapping(target = "user", source = "user", qualifiedByName = "id")
    UsuarioDTO toDto(Usuario s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UsuarioDTO toDtoId(Usuario usuario);
}

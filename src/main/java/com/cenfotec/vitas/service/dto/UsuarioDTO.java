package com.cenfotec.vitas.service.dto;

import com.cenfotec.vitas.domain.enumeration.TipoDeSangre;
import com.cenfotec.vitas.domain.enumeration.TipoUsuario;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.cenfotec.vitas.domain.Usuario} entity.
 */
public class UsuarioDTO implements Serializable {

    private Long id;

    private Long identidad;

    private LocalDate fechaNacimiento;

    private String paisNacimiento;

    private String telefono;

    private TipoDeSangre tipoSangre;

    private String centroMedico;

    private TipoUsuario tipoUsuario;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdentidad() {
        return identidad;
    }

    public void setIdentidad(Long identidad) {
        this.identidad = identidad;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getPaisNacimiento() {
        return paisNacimiento;
    }

    public void setPaisNacimiento(String paisNacimiento) {
        this.paisNacimiento = paisNacimiento;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public TipoDeSangre getTipoSangre() {
        return tipoSangre;
    }

    public void setTipoSangre(TipoDeSangre tipoSangre) {
        this.tipoSangre = tipoSangre;
    }

    public String getCentroMedico() {
        return centroMedico;
    }

    public void setCentroMedico(String centroMedico) {
        this.centroMedico = centroMedico;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UsuarioDTO)) {
            return false;
        }

        UsuarioDTO usuarioDTO = (UsuarioDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, usuarioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UsuarioDTO{" +
            "id=" + getId() +
            ", identidad=" + getIdentidad() +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", paisNacimiento='" + getPaisNacimiento() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", tipoSangre='" + getTipoSangre() + "'" +
            ", centroMedico='" + getCentroMedico() + "'" +
            ", tipoUsuario='" + getTipoUsuario() + "'" +
            ", user=" + getUser() +
            "}";
    }
}

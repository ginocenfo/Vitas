package com.cenfotec.vitas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.cenfotec.vitas.domain.Internamiento} entity.
 */
public class InternamientoDTO implements Serializable {

    private Long id;

    private Instant inicioInternamiento;

    private Integer duracionInternamiento;

    private UsuarioDTO paciente;

    private SalaDTO sala;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getInicioInternamiento() {
        return inicioInternamiento;
    }

    public void setInicioInternamiento(Instant inicioInternamiento) {
        this.inicioInternamiento = inicioInternamiento;
    }

    public Integer getDuracionInternamiento() {
        return duracionInternamiento;
    }

    public void setDuracionInternamiento(Integer duracionInternamiento) {
        this.duracionInternamiento = duracionInternamiento;
    }

    public UsuarioDTO getPaciente() {
        return paciente;
    }

    public void setPaciente(UsuarioDTO paciente) {
        this.paciente = paciente;
    }

    public SalaDTO getSala() {
        return sala;
    }

    public void setSala(SalaDTO sala) {
        this.sala = sala;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InternamientoDTO)) {
            return false;
        }

        InternamientoDTO internamientoDTO = (InternamientoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, internamientoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InternamientoDTO{" +
            "id=" + getId() +
            ", inicioInternamiento='" + getInicioInternamiento() + "'" +
            ", duracionInternamiento=" + getDuracionInternamiento() +
            ", paciente=" + getPaciente() +
            ", sala=" + getSala() +
            "}";
    }
}

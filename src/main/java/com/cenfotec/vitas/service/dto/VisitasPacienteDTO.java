package com.cenfotec.vitas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.cenfotec.vitas.domain.VisitasPaciente} entity.
 */
public class VisitasPacienteDTO implements Serializable {

    private Long id;

    private Instant hora;

    private Double duracion;

    private UsuarioDTO paciente;

    private UsuarioDTO visitante;

    private InternamientoDTO sala;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getHora() {
        return hora;
    }

    public void setHora(Instant hora) {
        this.hora = hora;
    }

    public Double getDuracion() {
        return duracion;
    }

    public void setDuracion(Double duracion) {
        this.duracion = duracion;
    }

    public UsuarioDTO getPaciente() {
        return paciente;
    }

    public void setPaciente(UsuarioDTO paciente) {
        this.paciente = paciente;
    }

    public UsuarioDTO getVisitante() {
        return visitante;
    }

    public void setVisitante(UsuarioDTO visitante) {
        this.visitante = visitante;
    }

    public InternamientoDTO getSala() {
        return sala;
    }

    public void setSala(InternamientoDTO sala) {
        this.sala = sala;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VisitasPacienteDTO)) {
            return false;
        }

        VisitasPacienteDTO visitasPacienteDTO = (VisitasPacienteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, visitasPacienteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VisitasPacienteDTO{" +
            "id=" + getId() +
            ", hora='" + getHora() + "'" +
            ", duracion=" + getDuracion() +
            ", paciente=" + getPaciente() +
            ", visitante=" + getVisitante() +
            ", sala=" + getSala() +
            "}";
    }
}

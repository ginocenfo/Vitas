package com.cenfotec.vitas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.cenfotec.vitas.domain.Horario} entity.
 */
public class HorarioDTO implements Serializable {

    private Long id;

    private Instant horaEntrada;

    private Instant horaSalida;

    private SalaDTO horario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getHoraEntrada() {
        return horaEntrada;
    }

    public void setHoraEntrada(Instant horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public Instant getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(Instant horaSalida) {
        this.horaSalida = horaSalida;
    }

    public SalaDTO getHorario() {
        return horario;
    }

    public void setHorario(SalaDTO horario) {
        this.horario = horario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HorarioDTO)) {
            return false;
        }

        HorarioDTO horarioDTO = (HorarioDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, horarioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HorarioDTO{" +
            "id=" + getId() +
            ", horaEntrada='" + getHoraEntrada() + "'" +
            ", horaSalida='" + getHoraSalida() + "'" +
            ", horario=" + getHorario() +
            "}";
    }
}

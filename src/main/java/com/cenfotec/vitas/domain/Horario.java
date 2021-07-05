package com.cenfotec.vitas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A Horario.
 */
@Entity
@Table(name = "horario")
public class Horario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hora_entrada")
    private Instant horaEntrada;

    @Column(name = "hora_salida")
    private Instant horaSalida;

    @ManyToOne
    @JsonIgnoreProperties(value = { "hospital" }, allowSetters = true)
    private Sala horario;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Horario id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getHoraEntrada() {
        return this.horaEntrada;
    }

    public Horario horaEntrada(Instant horaEntrada) {
        this.horaEntrada = horaEntrada;
        return this;
    }

    public void setHoraEntrada(Instant horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public Instant getHoraSalida() {
        return this.horaSalida;
    }

    public Horario horaSalida(Instant horaSalida) {
        this.horaSalida = horaSalida;
        return this;
    }

    public void setHoraSalida(Instant horaSalida) {
        this.horaSalida = horaSalida;
    }

    public Sala getHorario() {
        return this.horario;
    }

    public Horario horario(Sala sala) {
        this.setHorario(sala);
        return this;
    }

    public void setHorario(Sala sala) {
        this.horario = sala;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Horario)) {
            return false;
        }
        return id != null && id.equals(((Horario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Horario{" +
            "id=" + getId() +
            ", horaEntrada='" + getHoraEntrada() + "'" +
            ", horaSalida='" + getHoraSalida() + "'" +
            "}";
    }
}

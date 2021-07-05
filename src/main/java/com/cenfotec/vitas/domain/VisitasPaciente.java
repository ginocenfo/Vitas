package com.cenfotec.vitas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A VisitasPaciente.
 */
@Entity
@Table(name = "visitas_paciente")
public class VisitasPaciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hora")
    private Instant hora;

    @Column(name = "duracion")
    private Double duracion;

    @ManyToOne
    private Usuario paciente;

    @ManyToOne
    private Usuario visitante;

    @ManyToOne
    @JsonIgnoreProperties(value = { "hospital" }, allowSetters = true)
    private Sala sala;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VisitasPaciente id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getHora() {
        return this.hora;
    }

    public VisitasPaciente hora(Instant hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(Instant hora) {
        this.hora = hora;
    }

    public Double getDuracion() {
        return this.duracion;
    }

    public VisitasPaciente duracion(Double duracion) {
        this.duracion = duracion;
        return this;
    }

    public void setDuracion(Double duracion) {
        this.duracion = duracion;
    }

    public Usuario getPaciente() {
        return this.paciente;
    }

    public VisitasPaciente paciente(Usuario usuario) {
        this.setPaciente(usuario);
        return this;
    }

    public void setPaciente(Usuario usuario) {
        this.paciente = usuario;
    }

    public Usuario getVisitante() {
        return this.visitante;
    }

    public VisitasPaciente visitante(Usuario usuario) {
        this.setVisitante(usuario);
        return this;
    }

    public void setVisitante(Usuario usuario) {
        this.visitante = usuario;
    }

    public Sala getSala() {
        return this.sala;
    }

    public VisitasPaciente sala(Sala sala) {
        this.setSala(sala);
        return this;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VisitasPaciente)) {
            return false;
        }
        return id != null && id.equals(((VisitasPaciente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VisitasPaciente{" +
            "id=" + getId() +
            ", hora='" + getHora() + "'" +
            ", duracion=" + getDuracion() +
            "}";
    }
}

package com.cenfotec.vitas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A Internamiento.
 */
@Entity
@Table(name = "internamiento")
public class Internamiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "inicio_internamiento")
    private Instant inicioInternamiento;

    @Column(name = "duracion_internamiento")
    private Integer duracionInternamiento;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Usuario paciente;

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

    public Internamiento id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getInicioInternamiento() {
        return this.inicioInternamiento;
    }

    public Internamiento inicioInternamiento(Instant inicioInternamiento) {
        this.inicioInternamiento = inicioInternamiento;
        return this;
    }

    public void setInicioInternamiento(Instant inicioInternamiento) {
        this.inicioInternamiento = inicioInternamiento;
    }

    public Integer getDuracionInternamiento() {
        return this.duracionInternamiento;
    }

    public Internamiento duracionInternamiento(Integer duracionInternamiento) {
        this.duracionInternamiento = duracionInternamiento;
        return this;
    }

    public void setDuracionInternamiento(Integer duracionInternamiento) {
        this.duracionInternamiento = duracionInternamiento;
    }

    public Usuario getPaciente() {
        return this.paciente;
    }

    public Internamiento paciente(Usuario usuario) {
        this.setPaciente(usuario);
        return this;
    }

    public void setPaciente(Usuario usuario) {
        this.paciente = usuario;
    }

    public Sala getSala() {
        return this.sala;
    }

    public Internamiento sala(Sala sala) {
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
        if (!(o instanceof Internamiento)) {
            return false;
        }
        return id != null && id.equals(((Internamiento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Internamiento{" +
            "id=" + getId() +
            ", inicioInternamiento='" + getInicioInternamiento() + "'" +
            ", duracionInternamiento=" + getDuracionInternamiento() +
            "}";
    }
}

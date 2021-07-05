package com.cenfotec.vitas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Sala.
 */
@Entity
@Table(name = "sala")
public class Sala implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "numero")
    private String numero;

    @Column(name = "piso")
    private Integer piso;

    @Column(name = "total_pacientes")
    private Integer totalPacientes;

    @Column(name = "num_pacientes")
    private Integer numPacientes;

    @Column(name = "num_visitantes")
    private Integer numVisitantes;

    @Column(name = "visita_disponible")
    private Boolean visitaDisponible;

    @ManyToOne
    @JsonIgnoreProperties(value = { "salas" }, allowSetters = true)
    private Hospital hospital;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sala id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Sala nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNumero() {
        return this.numero;
    }

    public Sala numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Integer getPiso() {
        return this.piso;
    }

    public Sala piso(Integer piso) {
        this.piso = piso;
        return this;
    }

    public void setPiso(Integer piso) {
        this.piso = piso;
    }

    public Integer getTotalPacientes() {
        return this.totalPacientes;
    }

    public Sala totalPacientes(Integer totalPacientes) {
        this.totalPacientes = totalPacientes;
        return this;
    }

    public void setTotalPacientes(Integer totalPacientes) {
        this.totalPacientes = totalPacientes;
    }

    public Integer getNumPacientes() {
        return this.numPacientes;
    }

    public Sala numPacientes(Integer numPacientes) {
        this.numPacientes = numPacientes;
        return this;
    }

    public void setNumPacientes(Integer numPacientes) {
        this.numPacientes = numPacientes;
    }

    public Integer getNumVisitantes() {
        return this.numVisitantes;
    }

    public Sala numVisitantes(Integer numVisitantes) {
        this.numVisitantes = numVisitantes;
        return this;
    }

    public void setNumVisitantes(Integer numVisitantes) {
        this.numVisitantes = numVisitantes;
    }

    public Boolean getVisitaDisponible() {
        return this.visitaDisponible;
    }

    public Sala visitaDisponible(Boolean visitaDisponible) {
        this.visitaDisponible = visitaDisponible;
        return this;
    }

    public void setVisitaDisponible(Boolean visitaDisponible) {
        this.visitaDisponible = visitaDisponible;
    }

    public Hospital getHospital() {
        return this.hospital;
    }

    public Sala hospital(Hospital hospital) {
        this.setHospital(hospital);
        return this;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sala)) {
            return false;
        }
        return id != null && id.equals(((Sala) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sala{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", numero='" + getNumero() + "'" +
            ", piso=" + getPiso() +
            ", totalPacientes=" + getTotalPacientes() +
            ", numPacientes=" + getNumPacientes() +
            ", numVisitantes=" + getNumVisitantes() +
            ", visitaDisponible='" + getVisitaDisponible() + "'" +
            "}";
    }
}

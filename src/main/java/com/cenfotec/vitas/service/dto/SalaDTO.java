package com.cenfotec.vitas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.cenfotec.vitas.domain.Sala} entity.
 */
public class SalaDTO implements Serializable {

    private Long id;

    private String nombre;

    private String numero;

    private Integer piso;

    private Integer totalPacientes;

    private Integer numPacientes;

    private Integer numVisitantes;

    private Boolean visitaDisponible;

    private HospitalDTO hospital;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Integer getPiso() {
        return piso;
    }

    public void setPiso(Integer piso) {
        this.piso = piso;
    }

    public Integer getTotalPacientes() {
        return totalPacientes;
    }

    public void setTotalPacientes(Integer totalPacientes) {
        this.totalPacientes = totalPacientes;
    }

    public Integer getNumPacientes() {
        return numPacientes;
    }

    public void setNumPacientes(Integer numPacientes) {
        this.numPacientes = numPacientes;
    }

    public Integer getNumVisitantes() {
        return numVisitantes;
    }

    public void setNumVisitantes(Integer numVisitantes) {
        this.numVisitantes = numVisitantes;
    }

    public Boolean getVisitaDisponible() {
        return visitaDisponible;
    }

    public void setVisitaDisponible(Boolean visitaDisponible) {
        this.visitaDisponible = visitaDisponible;
    }

    public HospitalDTO getHospital() {
        return hospital;
    }

    public void setHospital(HospitalDTO hospital) {
        this.hospital = hospital;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SalaDTO)) {
            return false;
        }

        SalaDTO salaDTO = (SalaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, salaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SalaDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", numero='" + getNumero() + "'" +
            ", piso=" + getPiso() +
            ", totalPacientes=" + getTotalPacientes() +
            ", numPacientes=" + getNumPacientes() +
            ", numVisitantes=" + getNumVisitantes() +
            ", visitaDisponible='" + getVisitaDisponible() + "'" +
            ", hospital=" + getHospital() +
            "}";
    }
}

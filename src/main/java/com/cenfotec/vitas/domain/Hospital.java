package com.cenfotec.vitas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Hospital.
 */
@Entity
@Table(name = "hospital")
public class Hospital implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "provincia")
    private String provincia;

    @Column(name = "canton")
    private String canton;

    @Column(name = "distrito")
    private String distrito;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "hospital")
    @JsonIgnoreProperties(value = { "hospital" }, allowSetters = true)
    private Set<Sala> salas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Hospital id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Hospital nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getProvincia() {
        return this.provincia;
    }

    public Hospital provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getCanton() {
        return this.canton;
    }

    public Hospital canton(String canton) {
        this.canton = canton;
        return this;
    }

    public void setCanton(String canton) {
        this.canton = canton;
    }

    public String getDistrito() {
        return this.distrito;
    }

    public Hospital distrito(String distrito) {
        this.distrito = distrito;
        return this;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public Hospital direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public Hospital telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return this.email;
    }

    public Hospital email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Sala> getSalas() {
        return this.salas;
    }

    public Hospital salas(Set<Sala> salas) {
        this.setSalas(salas);
        return this;
    }

    public Hospital addSalas(Sala sala) {
        this.salas.add(sala);
        sala.setHospital(this);
        return this;
    }

    public Hospital removeSalas(Sala sala) {
        this.salas.remove(sala);
        sala.setHospital(null);
        return this;
    }

    public void setSalas(Set<Sala> salas) {
        if (this.salas != null) {
            this.salas.forEach(i -> i.setHospital(null));
        }
        if (salas != null) {
            salas.forEach(i -> i.setHospital(this));
        }
        this.salas = salas;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hospital)) {
            return false;
        }
        return id != null && id.equals(((Hospital) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Hospital{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", canton='" + getCanton() + "'" +
            ", distrito='" + getDistrito() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}

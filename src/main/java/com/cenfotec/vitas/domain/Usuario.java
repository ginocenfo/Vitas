package com.cenfotec.vitas.domain;

import com.cenfotec.vitas.domain.enumeration.TipoDeSangre;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "identidad")
    private Long identidad;

    @Column(name = "primer_nombre")
    private String primerNombre;

    @Column(name = "segundo_nombre")
    private String segundoNombre;

    @Column(name = "primer_apellido")
    private String primerApellido;

    @Column(name = "segundo_apellido")
    private String segundoApellido;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "pais_nacimiento")
    private String paisNacimiento;

    @Column(name = "telefono")
    private String telefono;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_sangre")
    private TipoDeSangre tipoSangre;

    @Column(name = "mail")
    private String mail;

    @Column(name = "centro_medico")
    private String centroMedico;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdentidad() {
        return this.identidad;
    }

    public Usuario identidad(Long identidad) {
        this.identidad = identidad;
        return this;
    }

    public void setIdentidad(Long identidad) {
        this.identidad = identidad;
    }

    public String getPrimerNombre() {
        return this.primerNombre;
    }

    public Usuario primerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
        return this;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public String getSegundoNombre() {
        return this.segundoNombre;
    }

    public Usuario segundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
        return this;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public String getPrimerApellido() {
        return this.primerApellido;
    }

    public Usuario primerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
        return this;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return this.segundoApellido;
    }

    public Usuario segundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
        return this;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public LocalDate getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    public Usuario fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getPaisNacimiento() {
        return this.paisNacimiento;
    }

    public Usuario paisNacimiento(String paisNacimiento) {
        this.paisNacimiento = paisNacimiento;
        return this;
    }

    public void setPaisNacimiento(String paisNacimiento) {
        this.paisNacimiento = paisNacimiento;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public Usuario telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public TipoDeSangre getTipoSangre() {
        return this.tipoSangre;
    }

    public Usuario tipoSangre(TipoDeSangre tipoSangre) {
        this.tipoSangre = tipoSangre;
        return this;
    }

    public void setTipoSangre(TipoDeSangre tipoSangre) {
        this.tipoSangre = tipoSangre;
    }

    public String getMail() {
        return this.mail;
    }

    public Usuario mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getCentroMedico() {
        return this.centroMedico;
    }

    public Usuario centroMedico(String centroMedico) {
        this.centroMedico = centroMedico;
        return this;
    }

    public void setCentroMedico(String centroMedico) {
        this.centroMedico = centroMedico;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", identidad=" + getIdentidad() +
            ", primerNombre='" + getPrimerNombre() + "'" +
            ", segundoNombre='" + getSegundoNombre() + "'" +
            ", primerApellido='" + getPrimerApellido() + "'" +
            ", segundoApellido='" + getSegundoApellido() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", paisNacimiento='" + getPaisNacimiento() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", tipoSangre='" + getTipoSangre() + "'" +
            ", mail='" + getMail() + "'" +
            ", centroMedico='" + getCentroMedico() + "'" +
            "}";
    }
}

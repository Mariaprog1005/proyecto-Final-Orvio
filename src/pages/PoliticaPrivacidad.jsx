const PoliticaPrivacidad = () => {
  return (
    <div className="layout-content" style={{ maxWidth: "800px", margin: "2rem auto", border: "2px solid #9b87f5", borderRadius: "12px", padding: "2rem", background: "#fff" }}>
      <h1>Política de Privacidad</h1>
      
      <p style={{ color: "var(--clr-muted)", marginBottom: "1.5rem" }}>
        Última actualización: Noviembre de 2026
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "var(--clr-text)" }}>
        <section>
          <h3>1. Información que recopilamos</h3>
          <p style={{ color: "var(--clr-muted)", marginTop: "0.5rem" }}>
            En <strong>Orvio Electronics</strong> recopilamos información básica necesaria para procesar tus consultas y simulación de compras en nuestra tienda de prueba, garantizando la confidencialidad de los datos.
          </p>
        </section>

        <section>
          <h3>2. Uso de la información</h3>
          <p style={{ color: "var(--clr-muted)", marginTop: "0.5rem" }}>
            Los datos ingresados se utilizan exclusivamente de manera interna para gestionar el funcionamiento del carrito de compras y mejorar la experiencia dentro de la plataforma web.
          </p>
        </section>

        <section>
          <h3>3. Seguridad</h3>
          <p style={{ color: "var(--clr-muted)", marginTop: "0.5rem" }}>
            Implementamos medidas de seguridad técnicas para proteger la integridad de la aplicación y el entorno de desarrollo frente a accesos no autorizados.
          </p>
        </section>

        <section>
          <h3>4. Contacto</h3>
          <p style={{ color: "var(--clr-muted)", marginTop: "0.5rem" }}>
            Si tenés dudas acerca de esta política de privacidad, podés comunicarte con el equipo de soporte de la tienda.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
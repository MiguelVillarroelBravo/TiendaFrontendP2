import ContactForm from '../components/ContactForm';

export default function Contacto() {
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="fw-bold mb-2" style={{ color: '#c2185b' }}>Contáctanos</h2>
          <p className="text-muted mb-4">
            También puedes escribirnos a norbert@gmail.com
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
import Button from 'react-bootstrap/Button';

function VariantsExample() {
  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: black;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 0.8rem;
    }
    `}
      </style>

      <Button variant="flat" size="xxl">
        Login/Signup
      </Button>
    </>
  );
}

export default VariantsExample;
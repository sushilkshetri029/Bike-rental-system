import './Input.css';

const Input = ({ className='', type='text', label='Enter', name='input-default-name' }) => {
    return (
        <div className={`input-field ${className}`}>
            <input type={type} name={name} required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{label}</label>
        </div>
    )
}

export default Input;
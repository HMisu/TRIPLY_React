import '../../scss/ui/Button.scss';

const Button = ({id, type, scss, onClick, text}) => {
    const btnType = ["positive", "negative"].includes(scss) ? scss : "default";

    return (
        <button className={["Button", `${btnType}`].join(" ")} id={id} onClick={onClick}
                type={type}>{text}</button>
    );
};

Button.defaultProps = {scss: "default", type:"button"}

export default Button;
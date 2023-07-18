interface ButtonProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
	return (
		<button type='submit' value='Submit' onClick={onClick}>
			Submit
		</button>
	);
};

export default Button;

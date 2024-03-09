import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	let isFirstStep = true;
	let isLastStep = false;

	const clickForward = () => {
		if (activeIndex < 6) {
			setActiveIndex(activeIndex + 1);
		}
	};

	const clickBackward = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const clickToFirstStep = () => {
		setActiveIndex(0);
	};

	if (activeIndex === 0) {
		isFirstStep = true;
	} else if (activeIndex === 6) {
		isFirstStep = false;
		isLastStep = true;
	} else {
		isFirstStep = false;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps.map((e, i) => {
							return i === activeIndex && <p key={e.id}>{e.content}</p>;
						})}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((e, i) => {
							return (
								<li
									className={
										styles['steps-item'] +
										(activeIndex === i
											? ' ' + styles.active
											: activeIndex > i
												? ' ' + styles.done
												: '')
									}
									key={e.id}
								>
									<button
										className={styles['steps-item-button']}
										onClick={() => setActiveIndex(i)}
									>
										{parseInt(e.id)}
									</button>
									{e.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={clickBackward}
							disabled={isFirstStep}
						>
							Назад
						</button>
						{isLastStep && (
							<button className={styles.button} onClick={clickToFirstStep}>
								Начать сначала
							</button>
						)}
						<button
							className={styles.button}
							onClick={clickForward}
							disabled={isLastStep}
						>
							Далее
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

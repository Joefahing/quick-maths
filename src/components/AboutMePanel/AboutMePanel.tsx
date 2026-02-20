import type { JSX } from 'react';

import aboutMeImage from '../../assets/pictures/about.webp';

import classes from './AboutMePanel.module.css';

export function AboutMePanel(): JSX.Element {
	return (
		<section className={classes.about_me}>
			<img className={classes.profile_picture} src={aboutMeImage} alt="About Me Image" />
			<div className={classes.about_me_wrapper}>
				<h2>About Me</h2>
				<p>
					Hi Users! My name is Joefa.
					<br />
					<br />
					I built Quick Maths Game because I noticed something about myself. <br />
					<br />
					Whenever I needed a break from work or studying, I would open a typing test. Not to become the world’s fastest
					typist. Not for any real reason. Just… because finishing it gave me a small sense of accomplishment. <br />
					<br />
					Quick Maths Game is my small attempt to make “productive breaks” a little more meaningful. Something
					lightweight. Something a bit challenging. Something that makes you think, but doesn’t exhaust you. <br />
					<br />
					If this game makes you slightly faster at math, great. <br />
					If it replaces one typing test session, even better. <br />
					If it makes you smile at your own wrong answers — that’s perfect. <br />
					<br />
					Thanks for being here :)
				</p>
			</div>
		</section>
	);
}

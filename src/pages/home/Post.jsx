import css from '../../stylesheets/index.module.css'
import cx from 'classnames'

const Post = ({ post, onClick }) => {
	let date = new Date(post.creation_date || Date.now())
	const strDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()}`
	const content = () => {
		return (
			<p
				className={cx(css.PostContent, {
					[css.Hidden]: !post.content,
					[css.Full]: !post.img_url,
				})}
			>
				{post.content || 'Sin descripción.'}
			</p>
		)
	}
	const image = () => {
		if (post.img_url)
			return (
				<div className={css.PostImage}>
					<img src={post.img_url} />
					<div className={css.Hover}>Ver más</div>
				</div>
			)

		return <></>
	}
	return (
		<div
			className={cx(css.Post, {
				[css.Preview]: post.preview,
			})}
			onClick={onClick}
		>
			<div className={css.PostBody}>
				<div className={css.PostHeader}>
					<p className={css.PostUsername}>{post.username}</p>
					<p className={css.PostDate}>{strDate}</p>
				</div>
				{content()}
			</div>
			{image()}
		</div>
	)
}

export default Post

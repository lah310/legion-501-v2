import css from '../../stylesheets/index.module.css'
import { useState, useEffect } from 'react'
import supa from '../../js/supa'
import Post from './Post'
import cx from 'classnames'
import { useLocalStorage } from '@uidotdev/usehooks'

const Blog = () => {
	const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', null)
	const [paragraph, setParagraph] = useState(null)
	const [image, setImage] = useState(null)
	const [posts, setPosts] = useState([])
	const [showNewPostModal, setShowNewPostModal] = useState(false)
	const [postModal, setPostModal] = useState({ show: false })

	const handlePostModal = (post) => {
		let newPost = { show: true, ...post }
		let date = new Date(post.creation_date || Date.now())
		const strDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`
		newPost.creation_date = strDate
		setPostModal(newPost)
	}

	const handleParagraph = (e) => setParagraph(e.target.value)

	const handleImage = (e) => setImage(e.target.value)

	const getPosts = () =>
		supa
			.from('pretty_posts')
			.select('*')
			.then((res) => setPosts(res.data))

	const handleNewPost = async (e) => {
		e.preventDefault()
		await supa.from('posts').insert({
			user_id: loggedUser.id,
			content: paragraph,
			img_url: image,
		})
		setParagraph(null)
		setImage(null)
		getPosts()
	}

	const deletePost = async () => {
		await supa.from('posts').delete().eq('id', postModal.id)
		setPostModal({ ...postModal, show: false })
		getPosts()
	}

	useEffect(() => getPosts, [])

	return (
		<div>
			<dialog
				className={cx(
					css.Modal,
					{ [css.Hidden]: !postModal.show },
					css.IsPost
				)}
			>
				<div className={css.PostModal}>
					<div className={css.PostModalImageContainer}>
						<img
							className={css.PostModalImage}
							src={postModal.img_url}
						/>
					</div>
					<div className={css.PostModalBody}>
						<div className={css.PostModalHeader}>
							<div className={css.Bar}>
								<a href='#'>
									<h2>{postModal.username}</h2>
								</a>
								<div className={css.BtnGroup}>
									{(postModal.username === loggedUser.name ||
										loggedUser.is_admin) && (
										<button onClick={deletePost}>
											<i className='bx bx-trash bx-sm'></i>
										</button>
									)}
									<button
										onClick={() =>
											setPostModal({
												...postModal,
												show: false,
											})
										}
									>
										<i className='bx bx-x bx-sm'></i>
									</button>
								</div>
							</div>
							<small>{postModal.creation_date}</small>
						</div>
						<p>{postModal.content}</p>
					</div>
				</div>
			</dialog>
			<dialog
				className={cx(css.Modal, { [css.Hidden]: !showNewPostModal })}
			>
				<div className={css.NewPost}>
					<form
						className={css.Form}
						id='new-post-form'
					>
						<h2>Nueva publicación</h2>
						<textarea
							placeholder='Estoy pensando en...'
							onChange={handleParagraph}
						/>
						<input
							type='text'
							placeholder='URL de imagen'
							onChange={handleImage}
						/>
						<div className={css.BtnGroup}>
							<button
								type='submit'
								// className={css.Submit}
								onClick={() => setShowNewPostModal(false)}
							>
								Cancelar
							</button>
							<button
								type='submit'
								// className={css.Submit}
								onClick={handleNewPost}
							>
								Publicar
							</button>
						</div>
						<div className={css.Hint}>
							<p>
								¿Tenés dudas? Consultá la{' '}
								<a href='#'>documentación</a>.
							</p>
						</div>
					</form>
					<Post
						post={{
							username: loggedUser.name,
							content: paragraph || 'Estoy pensando en...',
							img_url: image,
							preview: true,
						}}
					/>
				</div>
			</dialog>
			<div className={css.Middle}>
				<div className={css.Separator}>
					<p>Publicaciones</p>
					<div className={css.BtnGroup}>
						<button
							className={cx(css.Wide, css.Wide)}
							onClick={() => setShowNewPostModal(true)}
						>
							<i className='bx bx-plus bx-sm'></i>
							Nueva publicación
						</button>
						<button
							className={css.Squared}
							onClick={getPosts}
						>
							<i className='bx bx-sync bx-sm'></i>
						</button>
					</div>
				</div>
				<div className={css.Feed}>
					{posts.map((post, i) => (
						<Post
							post={post}
							key={i}
							onClick={() => handlePostModal(post)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Blog

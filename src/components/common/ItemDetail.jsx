import { useParams, Link, useNavigate } from 'react-router-dom'
import { characters, episodes, locations } from '../../../public'
import './ItemDetail.css'

export const ItemDetail = () => {
	const { categoryId, itemId } = useParams()
	const navigate = useNavigate()

	// Собираем все данные в один объект
	const dataMap = {
		characters: characters,
		episodes: episodes,
		locations: locations
	}

	const items = dataMap[categoryId]
	const item = items?.find(item => item.id === Number(itemId))

	if (!item) {
		return (
			<div className="not-found">
				<h1>Item not found</h1>
				<Link to={`/category/${categoryId}`}>← Back to {categoryId}</Link>
			</div>
		)
	}

	// Конфигурация отображения для каждой категории
	const detailConfigs = {
		characters: {
			title: item.name,
			image: item.image,
			accentColor: '#00b894',
			fields: [
				{ label: 'Status', value: item.status, type: 'badge' },
				{ label: 'Species', value: item.species },
				{ label: 'Gender', value: item.gender },
				{ label: 'Type', value: item.type || 'Unknown' },
				{ label: 'Created', value: new Date(item.created).toLocaleDateString() }
			],
			additionalInfo: [
				{ label: 'Full Name', value: item.name },
				{ label: 'Current Status', value: item.status, highlight: true },
				{ label: 'Origin', value: 'Earth (C-137)' },
				{ label: 'Last Location', value: 'Citadel of Ricks' }
			]
		},
		episodes: {
			title: item.name,
			image: null,
			accentColor: '#8e44ad',
			fields: [
				{ label: 'Episode', value: item.episode },
				{ label: 'Air Date', value: item.air_date },
				{ label: 'Season', value: item.episode?.split('E')[0] || 'Unknown' },
				{ label: 'Created', value: new Date(item.created).toLocaleDateString() }
			],
			additionalInfo: [
				{ label: 'Episode Code', value: item.episode },
				{ label: 'Air Date', value: item.air_date, highlight: true },
				{ label: 'Characters', value: '20 characters' },
				{ label: 'Duration', value: '22 min' }
			]
		},
		locations: {
			title: item.name,
			image: null,
			accentColor: '#3498db',
			fields: [
				{ label: 'Type', value: item.type },
				{ label: 'Dimension', value: item.dimension },
				{ label: 'Residents', value: '15 residents' },
				{ label: 'Created', value: new Date(item.created).toLocaleDateString() }
			],
			additionalInfo: [
				{ label: 'Location Type', value: item.type },
				{ label: 'Dimension', value: item.dimension, highlight: true },
				{ label: 'Notable Residents', value: 'Rick Sanchez, Morty Smith' },
				{ label: 'Planet Class', value: 'Class M' }
			]
		}
	}

	const config = detailConfigs[categoryId]
	const currentIndex = items.findIndex(i => i.id === item.id)

	return (
		<div className="item-detail-page" style={{ '--accent-color': config.accentColor }}>
			{/* Кнопка назад */}
			<div className="back-button-container">
				<button onClick={() => navigate(-1)} className="back-button">
					← Back to {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
				</button>
			</div>

			{/* Основной контейнер */}
			<div className="item-detail-container">
				{/* Левая часть */}
				<div className="item-image-section">
					<div className="image-wrapper">
						{config.image ? (
							<img
								src={config.image}
								alt={config.title}
								className="item-detail-image"
							/>
						) : (
							<div className="placeholder-image" style={{ backgroundColor: config.accentColor + '20' }}>
								<span className="placeholder-text">
									{categoryId.charAt(0).toUpperCase()}
								</span>
							</div>
						)}
						{item.status && (
							<div className="status-badge large" style={{ backgroundColor: config.accentColor }}>
								{item.status}
							</div>
						)}
					</div>
				</div>

				{/* Правая часть */}
				<div className="item-info-section">
					{/* Заголовок */}
					<div className="item-header">
						<h1 className="item-title">{config.title}</h1>
						<div className="item-id">ID: {item.id}</div>
					</div>

					{/* Основная информация */}
					<div className="info-grid">
						{config.fields.map((field, index) => (
							<div key={index} className="info-card">
								<h3 className="info-title">{field.label}</h3>
								{field.type === 'badge' ? (
									<span className="info-badge" style={{ backgroundColor: config.accentColor }}>
										{field.value}
									</span>
								) : (
									<p className="info-value">{field.value}</p>
								)}
							</div>
						))}
					</div>

					{/* Дополнительная информация */}
					<div className="additional-info">
						<h2 className="section-title">Additional Information</h2>
						<div className="details-list">
							{config.additionalInfo.map((info, index) => (
								<div key={index} className="detail-item">
									<span className="detail-label">{info.label}</span>
									<span
										className={`detail-value ${info.highlight ? 'highlight' : ''}`}
										style={info.highlight ? { color: config.accentColor } : {}}
									>
										{info.value}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Кнопки действий */}
					<div className="action-buttons">
						<button className="action-btn primary" style={{ backgroundColor: config.accentColor }}>
							Add to Favorites
						</button>
						<button className="action-btn secondary" style={{ borderColor: config.accentColor, color: config.accentColor }}>
							Share
						</button>
					</div>
				</div>
			</div>

			{/* Навигация */}
			<div className="related-navigation">
				<div className="nav-buttons">
					{currentIndex > 0 && (
						<Link
							to={`/category/${categoryId}/${items[currentIndex - 1].id}`}
							className="nav-btn prev"
							style={{ borderColor: config.accentColor, color: config.accentColor }}
						>
							← Previous
						</Link>
					)}

					<span className="nav-info">
						{currentIndex + 1} of {items.length}
					</span>

					{currentIndex < items.length - 1 && (
						<Link
							to={`/category/${categoryId}/${items[currentIndex + 1].id}`}
							className="nav-btn next"
							style={{ borderColor: config.accentColor, color: config.accentColor }}
						>
							Next →
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { characters, episodes, locations } from '../../../public'
import './CategoryList.css'

export const CategoryList = () => {
	const { categoryId } = useParams()
	const [currentPage, setCurrentPage] = useState(1)


	const dataMap = {
		characters: characters,
		episodes: episodes,
		locations: locations
	}


	const configs = {
		characters: {
			title: 'Characters',
			itemName: 'character',
			color: '#00b894',
			fields: [
				{ key: 'name', label: 'Name', width: '30%' },
				{ key: 'species', label: 'Species', width: '20%' },
				{ key: 'status', label: 'Status', width: '15%', badge: true },
				{ key: 'gender', label: 'Gender', width: '15%' },
				{ key: 'created', label: 'Created', width: '20%', type: 'date' }
			],
			gridView: {
				imageKey: 'image',
				titleKey: 'name',
				subtitleKey: 'species',
				badgeKey: 'status'
			}
		},
		episodes: {
			title: 'Episodes',
			itemName: 'episode',
			color: '#8e44ad',
			fields: [
				{ key: 'name', label: 'Name', width: '40%' },
				{ key: 'episode', label: 'Episode', width: '20%' },
				{ key: 'air_date', label: 'Air Date', width: '20%' },
				{ key: 'created', label: 'Created', width: '20%', type: 'date' }
			],
			gridView: {
				imageKey: null,
				titleKey: 'name',
				subtitleKey: 'episode',
				badgeKey: null
			}
		},
		locations: {
			title: 'Locations',
			itemName: 'location',
			color: '#3498db',
			fields: [
				{ key: 'name', label: 'Name', width: '30%' },
				{ key: 'type', label: 'Type', width: '25%' },
				{ key: 'dimension', label: 'Dimension', width: '30%' },
				{ key: 'created', label: 'Created', width: '15%', type: 'date' }
			],
			gridView: {
				imageKey: null,
				titleKey: 'name',
				subtitleKey: 'type',
				badgeKey: 'dimension'
			}
		}
	}

	const config = configs[categoryId]
	const allItems = dataMap[categoryId] || []
	const itemsPerPage = 12




	const totalPages = Math.ceil(allItems.length / itemsPerPage)
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem)



	return (
		<div className="category-list-page" style={{ '--category-color': config.color }}>

			<div className="cards-grid">
				{currentItems.map(item => (
					<Link
						key={item.id}
						to={`/category/${categoryId}/${item.id}`}
						className="category-card-link"
					>
						<div className="category-card">

							<div className="card-image-container">
								{config.gridView.imageKey && item[config.gridView.imageKey] ? (
									<img
										src={item[config.gridView.imageKey]}
										alt={item[config.gridView.titleKey]}
										className="card-image"
									/>
								) : (
									<div
										className="card-placeholder"
										style={{ backgroundColor: config.color + '20' }}
									>
										<span className="placeholder-icon">
											{categoryId.charAt(0).toUpperCase()}
										</span>
									</div>
								)}

								{/* Бейдж если есть */}
								{config.gridView.badgeKey && item[config.gridView.badgeKey] && (
									<div
										className="card-badge"
										style={{ backgroundColor: config.color }}
									>
										{item[config.gridView.badgeKey]}
									</div>
								)}
							</div>

							{/* Контент карточки */}
							<div className="card-content">
								<h3 className="card-title">{item[config.gridView.titleKey]}</h3>
								<p className="card-subtitle">{item[config.gridView.subtitleKey]}</p>

								{/* Дополнительные поля */}
								<div className="card-fields">
									{config.fields
										.filter(field => !['name', config.gridView.subtitleKey].includes(field.key))
										.slice(0, 2)
										.map(field => (
											<div key={field.key} className="card-field">
												<span className="field-label">{field.label}:</span>
												<span className="field-value">
													{field.type === 'date'
														? new Date(item[field.key]).toLocaleDateString()
														: item[field.key] || 'Unknown'
													}
												</span>
											</div>
										))}
								</div>

								<div className="card-footer">
									<span className="card-id">ID: {item.id}</span>
									<button className="view-details-btn">
										View Details →
									</button>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Пагинация */}
			{totalPages > 1 && (
				<div className="pagination">
					<button
						onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className="pagination-btn prev"
					>
						← Previous
					</button>

					<div className="page-numbers">
						{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
							let pageNum
							if (totalPages <= 5) {
								pageNum = i + 1
							} else if (currentPage <= 3) {
								pageNum = i + 1
							} else if (currentPage >= totalPages - 2) {
								pageNum = totalPages - 4 + i
							} else {
								pageNum = currentPage - 2 + i
							}

							return (
								<button
									key={pageNum}
									onClick={() => setCurrentPage(pageNum)}
									className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
								>
									{pageNum}
								</button>
							)
						})}

						{totalPages > 5 && currentPage < totalPages - 2 && (
							<>
								<span className="page-dots">...</span>
								<button
									onClick={() => setCurrentPage(totalPages)}
									className="page-btn"
								>
									{totalPages}
								</button>
							</>
						)}
					</div>

					<button
						onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
						className="pagination-btn next"
					>
						Next →
					</button>
				</div>
			)}
		</div>
	)
}


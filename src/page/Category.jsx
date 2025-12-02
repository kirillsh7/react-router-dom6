import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Characters } from '../components/common/Characters'
import { Episode } from '../components/common/Episode'
import { Location } from '../components/common/Location'
import { characters } from '../../public/characters'
import { episodes } from '../../public/episode'
import { locations } from '../../public/location'

export const Category = () => {
	const { id } = useParams()
	useEffect(() => {
		switch (id) {
			case 'characters':
				return <Characters characters={characters} />
			case 'episodes':
				return <Episode episodes={episodes} />
			case 'locations':
				return <Locations locations={locations} />
		}
	}, [])
	return (
		<>
			<h1>Category</h1>
		</>
	)
}
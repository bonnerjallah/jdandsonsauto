import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



import inventorystyle from '../styles/inventorystyle.module.css'

const Inventory = () => {
    return (
        <div>
            <div className={inventorystyle.headerContainer}>
                <div className={inventorystyle.header}>
                </div>
                <div className={inventorystyle.headericonWrapper}>
                    <h1>INVENTORY</h1>
                    <div className={inventorystyle.filterOptionIcon}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> <p style={{fontSize: '1rem', fontWeight: 'bold'}}>FILTER OPTIONS</p>
                    </div>
                </div>
            </div>

            <main>
                <div className={inventorystyle.KeywordSearchBarAndSortByContainer}>
                    <div className={inventorystyle.searchBarWrapper}>
                        <input type="text" name='keywordSearch' placeholder='Keyword Search' />
                    </div>
                    <div className={inventorystyle.pageSizeAndSortWrapper}>
                        <div className={inventorystyle.pageSizeWrapper}>
                            <p>Page Size</p>
                            <select>
                                <option value="5">5 Items</option>
                                <option value="10">10 Items</option>
                                <option value="15">15 Items</option>
                                <option value="20">20 Items</option>
                                <option value="25">25 Items</option>
                            </select>
                        </div>

                        <div className={inventorystyle.sortByWrapper}>
                            <p>Sort By</p>
                            <select>
                                <option value="Default">Default</option>
                                <option value="Price: Low - High">Price: Low - High</option>
                                <option value="Price: High - Low">Price: High - Low</option>
                                <option value="Miles: Low - High">Miles: Low - High</option>
                                <option value="Miles: High - Low">Miles: High - Low</option>
                                <option value="Year: Old - New">Year: Old - New</option>
                                <option value="Year: New - Old">Year: New - Old</option>
                                <option value="Make: A-Z">Make: A-Z</option>
                                <option value="Make: Z-A">Make: Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>
                
            </main>
            
        </div>
    )
}

export default Inventory
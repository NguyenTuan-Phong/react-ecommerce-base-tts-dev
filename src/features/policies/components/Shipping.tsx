// import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom'
import { dataShipping } from '../data/dataShipping'
import '../style/style.css'
const Shipping = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">CHÍNH SÁCH VẬN CHUYỂN</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: dataShipping }} />
            </div>
        </div>
        
    )
}
export default Shipping
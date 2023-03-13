import { BsShareFill, BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import {IoMdShareAlt} from 'react-icons/io';

const ShareButton = (props) => {

  const { id } = props;

  var sharelink = window.location.href;

  return (
    <div
        className="share"
      >
        <span><IoMdShareAlt/>Delen</span>
        <nav>
          <a target="_blank" href={`https://twitter.com/share?text=Interessante vacature in Zaanstad&url=`+sharelink+`&hashtags=zaanstad,werken bij,pak je kans`} ><BsTwitter alt='Share met Twitter' /></a>
          <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=`+sharelink} ><BsFacebook alt='Share met Facebook'/></a>
          <a target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=`+sharelink}><BsLinkedin alt='Share met LinkedIn'/></a>
          <a target="_blank" href={`https://api.whatsapp.com/send?text=`+sharelink} data-action="share/whatsapp/share"><BsWhatsapp alt='Deel met Whatsapp' /></a>
        </nav>

    </div>
  );

};

export default ShareButton;


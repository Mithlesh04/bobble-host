import {Button,Dialog,DialogActions,DialogTitle} from '@mui/material';


function ConfirmDialog({ body , isOpen , onClick }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        >
          
        <DialogTitle id="responsive-dialog-title" sx={{pb:3,pr:5,pt:3}}>
         {body}
        </DialogTitle>
        
        <DialogActions sx={{pb:3,pr:5,pt:3}} style={{justifyContent:'center'}}>
          <Button onClick={_=>onClick(true)} variant="contained" style={{background : "#F64E60",textTransform:'capitalize'}} sx={{mx:3,px:3}}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.11094 5.31336L10.0427 2.34559C10.4024 1.98141 10.4024 1.39094 10.0427 1.02646L9.39111 0.36689C9.03135 0.00270346 8.44805 0.00270346 8.08799 0.36689L5.15625 3.33465L2.22451 0.36689C1.86475 0.00270346 1.28145 0.00270346 0.921387 0.36689L0.269824 1.02646C-0.0899414 1.39064 -0.0899414 1.98111 0.269824 2.34559L3.20156 5.31336L0.269824 8.28112C-0.0899414 8.6453 -0.0899414 9.23577 0.269824 9.60026L0.921387 10.2598C1.28115 10.624 1.86475 10.624 2.22451 10.2598L5.15625 7.29206L8.08799 10.2598C8.44775 10.624 9.03135 10.624 9.39111 10.2598L10.0427 9.60026C10.4024 9.23607 10.4024 8.6456 10.0427 8.28112L7.11094 5.31336Z" fill="white"/>
            </svg>&nbsp;
            No
          </Button>
          <Button onClick={_=>onClick(false)} variant="contained" style={{background : "#1BC5BD",textTransform:'capitalize'}} sx={{mx:3,px:3}}>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.09466 11.7648L0.219661 6.82989C-0.0732202 6.53341 -0.0732202 6.05271 0.219661 5.7562L1.2803 4.6825C1.57318 4.38599 2.04808 4.38599 2.34096 4.6825L5.62499 8.00686L12.659 0.886422C12.9519 0.589943 13.4268 0.589943 13.7197 0.886422L14.7803 1.96012C15.0732 2.2566 15.0732 2.73731 14.7803 3.03382L6.15533 11.7648C5.86242 12.0613 5.38754 12.0613 5.09466 11.7648Z" fill="white"/>
           </svg>&nbsp;
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 }) // จำกัดความยาวชื่อ
  name!: string;

  @Column({ unique: true }) // ป้องกันไม่ให้สมัครอีเมลซ้ำกัน!
  email!: string;

  @Column() // รหัสผ่านที่แฮชแล้วมักจะยาว เราปล่อย default ไว้ได้
  password!: string;

  @Column({ length: 10, nullable: true }) // เบอร์โทร 10 หลัก และยอมให้เป็นค่าว่างได้ (ถ้าไม่ได้บังคับ)
  phone!: string;
}
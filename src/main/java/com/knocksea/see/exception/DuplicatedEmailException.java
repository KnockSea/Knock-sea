package com.knocksea.see.exception;

public class DuplicatedEmailException extends RuntimeException{

    public DuplicatedEmailException(String message) {
        super(message);
    }
}
